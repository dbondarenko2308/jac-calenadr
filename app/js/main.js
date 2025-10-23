$(document).ready(function() {
	const seminarDates = [
		new Date(2025, 10, 1),
		new Date(2025, 10, 2),
		new Date(2025, 10, 3),
		new Date(2025, 10, 12),
		new Date(2025, 10, 17),
		new Date(2025, 10, 26),
		new Date(2025, 10, 27)
	]

	new AirDatepicker('#calendar', {
		inline: true,
		autoClose: false,
		selectedDates: [new Date(2025, 10, 12)],

		onRenderCell({ date, cellType }) {
			if (cellType === 'day') {
				const isSeminar = seminarDates.some(
					d =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				)

				if (isSeminar) {
					return {
						classes: '-custom-'
					}
				}
			}
		}
	})

	$('.checkbox input').on('change', function() {
		const $text = $(this).closest('.checkbox').find('.checkbox__text')
		$text.toggleClass('active', $(this).is(':checked'))
	})

	$('.calendar__top').on('click', function() {
		var parent = $(this).parent()
		var block = parent.find('.calendar-block')

		block.toggleClass('active')

		var crossSvg = `
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 12.5L12.5 37.5" stroke="#A1A5AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5 12.5L37.5 37.5" stroke="#A1A5AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `

		var defaultSvg = `
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11.6667H25M19.6667 1V6.33333M6.33333 1V6.33333M6.83333 16.3533H8.204M17.796 16.3533H19.1667M12.3147 16.3533H13.6853M6.83333 20.4653H8.204M17.796 20.4653H19.1667M12.3147 20.4653H13.6853M19.6667 3.66667H6.33333C4.91885 3.66667 3.56229 4.22857 2.5621 5.22876C1.5619 6.22896 1 7.58551 1 9V20.6667C1 22.0812 1.5619 23.4377 2.5621 24.4379C3.56229 25.4381 4.91885 26 6.33333 26H19.6667C21.0812 26 22.4377 25.4381 23.4379 24.4379C24.4381 23.4377 25 22.0812 25 20.6667V9C25 7.58551 24.4381 6.22896 23.4379 5.22876C22.4377 4.22857 21.0812 3.66667 19.6667 3.66667Z" stroke="#07377E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    `

		if (block.hasClass('active')) {
			$(this).find('svg').replaceWith(crossSvg)
		} else {
			$(this).find('svg').replaceWith(defaultSvg)
		}
	})

	$('.page-form__mobile').on('click', function() {
		var parent = $(this).parent()
		var block = parent.find('.page-form__items')

		block.toggleClass('active')

		var crossSvg = `
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 12.5L12.5 37.5" stroke="#A1A5AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5 12.5L37.5 37.5" stroke="#A1A5AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `

		var defaultSvg = `
       <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M27.5 3.75H2.5L12.5 15.575V23.75L17.5 26.25V15.575L27.5 3.75Z" stroke="#07377E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
    `

		if (block.hasClass('active')) {
			$(this).find('svg').replaceWith(crossSvg)
		} else {
			$(this).find('svg').replaceWith(defaultSvg)
		}
	})

	// УБРАТЬ СКРИПТ ПОТОМ, Я ПРОСТО ПОКАЗАЛ РАБОТУ

	$('.page-news__top--item svg').on('click', function() {
		$(this).parent().remove()
	})
})
