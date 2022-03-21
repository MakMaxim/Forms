"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	//========================== Подсчет количества оставшихся символов в textarea ==========================
	const txtItem = document.querySelector('.textarea__item');
	const txtItemLimit = txtItem.getAttribute('maxlength');
	const txtCounter = document.querySelector('.textarea__counter span');
	txtCounter.innerHTML = txtItemLimit;
	txtItem.addEventListener("input", txtSetCounter);

	function txtSetCounter() {
		const txtCounterResult = txtItemLimit - txtItem.value.length;
		txtCounter.innerHTML = txtCounterResult;
	}
	//=======================================================================================================

	//========================================== Отправка данных ============================================
	async function formSend(e) {
		e.preventDefault()

		let error = formValidate(form)

		let formData = new FormData(form)
		formData.append('image', formImage.files[0])
	}
	//=======================================================================================================

	//===================================== Проверка введенных данных =======================================
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req')
		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i]
			formRemoveError(input)
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input)
					error++
				}
			}
			else if (input.classList.contains('_name')) {
				if (nameTest(input)) {
					formAddError(input)
					error++
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				formAddError(input)
				error++
			} else {
				if (input.value === '') {
					formAddError(input)
					error++
				}
			}
		}
		return error
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error')
		input.classList.remove('_error')
	}
	// функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	}
	// функция теста имени и фамилии
	function nameTest(input) {
		return !/^[А-Я]?[а-я]+$/.test(input.value)
	}
	//=======================================================================================================

	//======================== Удаление выделения элементов при фокусировке =================================
	const formName = document.querySelector('.form__name');
	formName.addEventListener("focus", () => {
		formRemoveError(formName)
	});

	const formSurname = document.querySelector('.form__surname');
	formSurname.addEventListener("focus", () => {
		formRemoveError(formSurname)
	});

	const formEmail = document.querySelector('.form__email');
	formEmail.addEventListener("focus", () => {
		formRemoveError(formEmail)
	});

	const checkboxInput = document.querySelector('.checkbox__input');
	checkboxInput.addEventListener("input", () => {
		formRemoveError(checkboxInput)
	});
	//=======================================================================================================

	//===================================== Превью картинки =================================================
	// Получаем инпут file в переменную
	const formImage = document.getElementById('formImage')
	// Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview')

	// Слушаем изменения в инпуте
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0])
		document.querySelector('.file__close').classList.add('_visible');
	})

	function uploadFile(file) {
		// Проверим тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('')
			formImage.value = ''
			return
		}
		// проверим размер файла
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.')
			return
		}

		let reader = new FileReader()
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" class='image' alt="Фото">`
		}
		reader.onerror = function (e) {
			alert('Ошибка')
		}
		reader.readAsDataURL(file)
	}

	// удаление картинки по нажатию на крестик
	const close = document.querySelector('.file__close')
	if (close) {
		close.addEventListener('click', function (e) {
			close.classList.remove('_visible')
			document.querySelector('.image').remove()
		})
	}
	//=======================================================================================================
})