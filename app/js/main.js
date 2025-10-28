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

	$('.page-form__mobile').on('click', function() {
		var parent = $(this).parent()
		var block = parent.find('.page-form__open')

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

	$('.select2').select2({
		minimumResultsForSearch: 1
	})

	$('.field input, .field-area textarea').keyup(function() {
		const label = $(this).parent().find('.field__label')
		const span = $(this).parent().find('.field__error')
		if ($(this).val().length > 0) {
			$(label).addClass('top')
			$(this).removeClass('error')
			$(span).hide()
		} else {
			$(label).removeClass('top')
		}
	})

	$('[data-fancybox]').fancybox({
		touch: false
	})

	$('body').on('click', '.file-item svg', function(event) {
		event.preventDefault()
		event.stopPropagation()

		let fileWrapper = $(this).closest('.field-file')
		fileWrapper.find('.file-item').remove()
		fileWrapper.find('.field-file input').val('')
		fileWrapper.find('.field-file__info--text').show()
		fileWrapper.find('.file-error').hide()
		fileWrapper.find('.field-file__icon').show()
	})

	$(document).on('select2:open', () => {
		$('body').addClass('select-close')
	})

	$(document).on('select2:close', () => {
		$('body').removeClass('select-close')
	})

	$('[data-nav-item]').on('click', function() {
		if (!$(this).hasClass('active')) {
			var index = $(this).index()
			$(this).addClass('active').siblings().removeClass('active')
			$('[data-nav-content]').removeClass('active').eq(index).addClass('active')
		}
		return false
	})

	

	$(function() {
		const $input = $('.mask')
		const $countryLabel = $('.phone-country')

		const masks = [
			{
				id: 'ru_kz',
				mask: '+{7} (000) 000-00-00',
				country: 'Россия / Казахстан',
				starts: ['7']
			},
			{
				id: 'by',
				mask: '+{375} (00) 000-00-00',
				country: 'Беларусь',
				starts: ['375']
			}
		]

		const mask = IMask($input[0], {
			mask: masks.map(m => m.mask),
			dispatch: function(appended, dynamicMasked) {
				const value = (dynamicMasked.value + appended).replace(/\D/g, '')
				for (let m of masks) {
					for (let s of m.starts) {
						if (value.indexOf(s) === 0) {
							return dynamicMasked.compiledMasks.find(cm => cm.mask === m.mask)
						}
					}
				}
				return dynamicMasked.compiledMasks.find(cm => cm.mask === masks[0].mask)
			}
		})

		function updateCountryLabel() {
			const curMask = mask.masked.currentMask && mask.masked.currentMask.mask
			const found = masks.find(m => m.mask === curMask)
			$countryLabel.text(found ? found.country : '')
		}

		mask.on('accept', () => {
			updateCountryLabel()
		})

		$input.on('blur', function() {
			const isComplete = mask.masked.isComplete
			if (!isComplete) {
				$input.addClass('error')
				if (!$input.next('.phone-error').length) {
					$input.after(
						'<div class="phone-error" style="color:#d00; font-size:12px; margin-top:4px;">Неполный номер</div>'
					)
				}
			} else {
				$input.removeClass('error')
				$input.next('.phone-error').remove()
			}
		})

		$input.on('focus', function() {
			$input.removeClass('error')
			$input.next('.phone-error').remove()
		})

		updateCountryLabel()
	})
})
