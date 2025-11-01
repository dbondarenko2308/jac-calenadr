$(document).ready(function() {
	function initMenu() {
		const isMobile = $(window).width() < 1300

		// Сначала убираем все старые обработчики
		$('.menu li.has-submenu > a').off()
		$('.submenu').off()
		$('.menu-lvl-first').off()
		$(document).off('click.menuOutside')

		if (isMobile) {
			// ==== Мобильная версия — КЛИК ====
			$('.menu li.has-submenu > a').on('click', function(e) {
				e.preventDefault()
				const $submenu = $(this).siblings('.submenu')

				if (!$submenu.hasClass('first-lvl')) {
					if ($submenu.is(':visible')) {
						$submenu.stop(true, true).slideUp(200)
						$(this).removeClass('active')
					} else {
						// Закрываем другие открытые подменю
						$(this).closest('ul').find('.submenu').not($submenu).slideUp(200)
						$(this).closest('ul').find('a.active').removeClass('active')

						// Открываем текущее
						$submenu.stop(true, true).slideDown(200)
						$(this).addClass('active')
					}
				}
			})

			// Клик вне меню — закрывает все
			$(document).on('click.menuOutside', function(e) {
				if (!$(e.target).closest('.menu').length) {
					$('.submenu').slideUp(200)
					$('.menu li.has-submenu > a').removeClass('active')
				}
			})

			$('.menu-lvl-first > a').on('click', function(e) {
				e.preventDefault()
				const $menuAllHeader = $(this).siblings('.menu-all-header')
				$('.menu-all-header').not($menuAllHeader).removeClass('active')
				$menuAllHeader.toggleClass('active')
			})
		} else {
			$('.menu li.has-submenu > a').hover(
				function() {
					const $submenu = $(this).siblings('.submenu')
					if (!$submenu.hasClass('first-lvl')) {
						$submenu.stop(true, true).slideDown(200)
						$(this).addClass('active')
					}
				},
				function() {
					const $submenu = $(this).siblings('.submenu')
					if (!$submenu.hasClass('first-lvl')) {
						$submenu.stop(true, true).slideUp(200)
						$(this).removeClass('active')
					}
				}
			)

			$('.submenu').hover(
				function() {
					if (!$(this).hasClass('first-lvl')) {
						$(this).stop(true, true).show()
						$(this).parent('.has-submenu').children('a').addClass('active')
					}
				},
				function() {
					if (!$(this).hasClass('first-lvl')) {
						$(this).stop(true, true).slideUp(200)
						$(this).parent('.has-submenu').children('a').removeClass('active')
					}
				}
			)

			$('.menu-lvl-first').hover(
				function() {
					$(this).find('.menu-all-header').addClass('active')
				},
				function() {
					$(this).find('.menu-all-header').removeClass('active')
				}
			)
		}
	}

	// Инициализация при загрузке
	initMenu()

	// И при изменении размера окна
	$(window).on('resize', function() {
		initMenu()
	})

	$('.header__burger').on('click', function() {
		$(this).toggleClass('active')
		$('.header__mobile').toggleClass('active')
	})
})
