$(document).ready(function() {
	function initMenu() {
	const isMobile = $(window).width() < 1300

	// Сначала убираем все старые обработчики
	$('.menu li.has-submenu > a').off()
	$('.submenu').off()
	$('.menu-lvl-first').off()
	$('.menu-all-header__back').off()
	$(document).off('click.menuOutside')

	if (isMobile) {
		// ==== Мобильная версия — КЛИК ====
		$('.menu li.has-submenu > a').on('click', function (e) {
			e.preventDefault()
			const $submenu = $(this).siblings('.submenu')

			if (!$submenu.hasClass('first-lvl')) {
				if ($submenu.is(':visible')) {
					$submenu.stop(true, true).slideUp(200)
					$(this).removeClass('active')
				} else {
					// Закрываем другие подменю на том же уровне
					$(this)
						.closest('ul')
						.find('> li > .submenu')
						.not($submenu)
						.slideUp(200)
					$(this)
						.closest('ul')
						.find('> li > a.active')
						.not(this)
						.removeClass('active')

					// Открываем текущее
					$submenu.stop(true, true).slideDown(200)
					$(this).addClass('active')
				}
			}
		})

		// Первый уровень
		$('.menu-lvl-first > a').on('click', function (e) {
			e.preventDefault()
			const $menuAllHeader = $(this).siblings('.menu-all-header')

			if ($menuAllHeader.hasClass('active')) {
				$menuAllHeader.removeClass('active')
				$(this).removeClass('active')
			} else {
				$('.menu-all-header').removeClass('active')
				$('.menu-lvl-first > a').removeClass('active')
				$menuAllHeader.addClass('active')
				$(this).addClass('active')
			}
		})

		// Назад — закрыть всё
		$('.menu-all-header__back').on('click', function (e) {
			e.preventDefault()
			const $parentMenu = $(this).closest('.menu-lvl-first')
			$parentMenu.find('.menu-all-header').removeClass('active')
			$parentMenu.find('a.active').removeClass('active')
			$parentMenu.find('.submenu').slideUp(200)
		})

		// Клик вне меню — закрывает всё
		$(document).on('click.menuOutside', function (e) {
			if (!$(e.target).closest('.menu').length) {
				$('.submenu').slideUp(200)
				$('.menu li.has-submenu > a').removeClass('active')
				$('.menu-all-header').removeClass('active')
			}
		})
	} else {
		// ==== Десктопная версия — HOVER ====
		$('.menu li.has-submenu > a').hover(
			function () {
				const $submenu = $(this).siblings('.submenu')
				if (!$submenu.hasClass('first-lvl')) {
					$submenu.stop(true, true).slideDown(200)
					$(this).addClass('active')
				}
			},
			function () {
				const $submenu = $(this).siblings('.submenu')
				if (!$submenu.hasClass('first-lvl')) {
					$submenu.stop(true, true).slideUp(200)
					$(this).removeClass('active')
				}
			}
		)

		$('.submenu').hover(
			function () {
				if (!$(this).hasClass('first-lvl')) {
					$(this).stop(true, true).show()
					$(this).parent('.has-submenu').children('a').addClass('active')
				}
			},
			function () {
				if (!$(this).hasClass('first-lvl')) {
					$(this).stop(true, true).slideUp(200)
					$(this).parent('.has-submenu').children('a').removeClass('active')
				}
			}
		)

		$('.menu-lvl-first').hover(
			function () {
				$(this).find('.menu-all-header').addClass('active')
			},
			function () {
				$(this).find('.menu-all-header').removeClass('active')
			}
		)
	}
}

// Инициализация при загрузке
initMenu()

// И при изменении размера окна
$(window).on('resize', function () {
	initMenu()
})


	$('.header__burger').on('click', function() {
	const $icon = $(this)

	$(this).toggleClass('active')
	$('.header__mobile').toggleClass('active')

	if ($(this).hasClass('active')) {
		// Меняем иконку на крестик
		$icon.html(`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
  <path d="M12.5 12.5L0.5 0.5M12.5 0.5L0.5 12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)
	} else {
		// Возвращаем бургер
		$icon.html(`<svg xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none">
  <path d="M0.5 10.5H18.5M0.5 5.5H18.5M0.5 0.5H18.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)
	}
})
})
