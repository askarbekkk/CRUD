
// получаем все элементы из html
let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let clearButton = document.querySelector('.clear-btn')

// добавляем дело при клике на кнопку добавить
addBtn.addEventListener('click',()=>  addTodo())

// добавляем обработка события при клике на кнопку clear all
clearButton.addEventListener('click',()=>  clear())

// добавляем дело при клике на кнопку Enter
todoName.addEventListener('keypress', (e)=> {
  if (e.key === 'Enter'){
      addTodo()
  }
})
// получаем данные из LocalStorage, если их там нет, то даем новый массив
function getTodos() {
    return  JSON.parse(localStorage.getItem('todos')) || []
}

//  запускается при клике на кнопку добавить
function addTodo(){
    // берем данные из инпута
    let newTodo = todoName.value
    // проверяем на пустоту
   if (newTodo.length > 0){
       // получаем данные из Localstorage  и создаем массив,  в котором все из этого хранилища  и через запятую значение из input
       let todos = getTodos()
       todos = [...todos, newTodo]
       // записываем обновленный массив в LocalStorage
       localStorage.setItem('todos', JSON.stringify(todos))
       // перерисовываем список
       view()
       // чистим  input
       todoName.value = ''
   }


}
// отрисовка списка на страницу
function view() {
    let tasks = getTodos()
    let list = ''
    // перебираем массив со всеми делами и складываем <li>  в переменную list
    tasks.forEach(item => list = list +  `<li class="list-group-item d-flex justify-content-between">${item} <button class="del-btn btn btn-danger" >Delete <i class="fas fa-minus-circle"></i> </buttonclass></li>`)

    // вставляем список на страницу
    todoBlock.innerHTML = '<ul class="list-group">' + list + '</ul>'
    // берем все кнопки удаления и навешиваем на каждое событие клика
    document.querySelectorAll('.del-btn').forEach((button,idx) => {
        button.addEventListener('click', ()=> {
            // вырезаем по индексу удаленный элемент
            tasks.splice(idx,1)
            // после удаления записываем массив без эого элемента  в хранилище
            localStorage.setItem('todos', JSON.stringify(tasks))
            // перерисовка
            view()
        })
    })
}
// очистить весь список
function clear () {
    // удаляем строку на из localStorage по  названию todos
    localStorage.removeItem('todos')
    // перерисовка
    view()
}
view()
