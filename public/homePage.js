//Выход из личного кабинета
const exit = new LogoutButton();

exit.action = () => {
  ApiConnector.logout((callback) => {
    if (callback.success) {
      location.reload();
    }
  });
};


//Получение информации о пользователе
ApiConnector.current((callback) => {
  console.log('коллбек от ApiConnector.current ', callback);
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
  }
})


//Получение текущих курсов валюты
//1
board = new RatesBoard(); 
//2
function getCurrentStock() {
  ApiConnector.getStocks((callback) => {
    //console.log(callback);
    if (callback.success){
      //3
      board.clearTable();
      board.fillTable(callback.data);
    }
  });
}
//4
getCurrentStock(); 
//5
let timerId = setInterval(() => getCurrentStock(), 60000);


//Операции с деньгами
//1
let money = new MoneyManager();
//2 Реализуйте пополнение баланса
money.addMoneyCallback = data => ApiConnector.addMoney(data, (callback) => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    money.setMessage(false, 'Операция прошла успешно');
  } else {
    money.setMessage(true, 'Операция прошла неуспешно');
  }
});
//3 Реализуйте конвертирование валюты
money.conversionMoneyCallback = data => ApiConnector.convertMoney(data, (callback) => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    money.setMessage(false, 'Операция прошла успешно');
  } else {
    money.setMessage(true, 'Операция прошла неуспешно');
  }
});
//4 Реализуйте перевод валюты
money.sendMoneyCallback = data => ApiConnector.transferMoney(data, (callback) => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    money.setMessage(false, 'Операция прошла успешно');
  } else {
    money.setMessage(true, 'Операция прошла неуспешно');
  }
})


//Работа с избранным
let fav = new FavoritesWidget();
//2 Запросите начальный список избранного
ApiConnector.getFavorites((callback) => {
  //console.log(callback.data);
  if (callback.success) {
    fav.clearTable();
    fav.fillTable(callback.data);
    money.updateUsersList(callback.data); 
  }
  
});

//3 Реализуйте добавления пользователя в список избранных
fav.addUserCallback = data => ApiConnector.addUserToFavorites(data, (callback) => {
  console.log(callback);
  if (callback.success) {
    fav.clearTable();
    fav.fillTable(callback.data);
    money.updateUsersList(callback.data);
    fav.setMessage(false, 'Операция прошла успешно'); 
  } else {
    fav.setMessage(true, 'Операция прошла неуспешно');
  }
})

//4 Реализуйте удаление пользователя из избранного
fav.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, (callback) => {
  if (callback.success) {
    fav.clearTable();
    fav.fillTable(callback.data);
    money.updateUsersList(callback.data);
    fav.setMessage(false, 'Операция прошла успешно'); 
  } else {
    fav.setMessage(true, 'Операция прошла неуспешно');
  }
})

