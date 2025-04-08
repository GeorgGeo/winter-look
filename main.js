
// Инициализация счетчика при загрузке
document.addEventListener('DOMContentLoaded', function() {
  updateSelectedCounter();
  updateCheckoutButton(); // Добавляем проверку состояния кнопки CHECKOUT

  // Делаем кнопку CHECKOUT неактивной изначально
  const checkoutBtn = document.querySelector('.btn-check');
  checkoutBtn.disabled = true;
  checkoutBtn.classList.add('disabled');
});

// Функция для плавного скролла
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Функция для обновления состояния кнопки CHECKOUT
function updateCheckoutButton() {
  const checkoutBtn = document.querySelector('.btn-check');
  const selectedCount = document.querySelectorAll('.btn-select.selected').length;

  if (selectedCount === 3) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('disabled');
  } else {
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add('disabled');
  }
}

// Функция для обновления счетчика выбранных продуктов
function updateSelectedCounter() {
  const selectedCount = document.querySelectorAll('.btn-select.selected').length;
  const totalSteps = 3;
  document.querySelector('.text-products').textContent = `${selectedCount} of ${totalSteps} products selected`;

  // Обновляем состояние кнопки CHECKOUT при каждом изменении выбора
  updateCheckoutButton();
};

// Обработчик для кнопки START
document.querySelector('.btn-start').addEventListener('click', function () {
  smoothScrollTo('step1');
});

// Обработчики для кнопок SELECT в каждой секции
document.querySelectorAll('.btn-select').forEach(button => {
  button.addEventListener('click', function () {
    // Находим родительскую секцию кнопки
    const section = this.closest('section');
    // const cards = section.querySelectorAll('.card');

    // Сбрасываем все кнопки в секции
    section.querySelectorAll('.btn-select').forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('selected');
      btn.classList.add('disabled');
      // Обновляем текст кнопок
      btn.textContent = btn === this ? 'SELECTED' : 'SELECT';
      
    });

    // Устанавливаем текущую кнопку как выбранную
    this.disabled = false;
    this.classList.remove('disabled');
    this.classList.add('selected');

    // Обновляем счетчик выбранных продуктов в хедере
    updateSelectedCounter();

    // Определяем следующую секцию
    // Скроллим к следующей секции
    if (section.id === 'step1') {
      smoothScrollTo('step2');
    } else if (section.id === 'step2') {
      smoothScrollTo('step3');
    }
    // Для step3 ничего не делаем, так как это последняя секция
  });

});