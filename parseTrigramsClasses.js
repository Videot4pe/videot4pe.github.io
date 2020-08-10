const vowels = ['а', 'о', 'и', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я'];
const consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

let classes = {
	'vvv': [],
	'vvc': [],
	'vcv': [],
	'vcc': [],
	'cvv': [],
	'cvc': [],
	'ccv': [],
	'ccc': [],
}

let title = '';

function parseClasses(data) {
	let triphones = [];
	for (let i = 0, j = i + 1, k = j + 1; i < data.length - 2, j < data.length - 1, k < data.length; i++, j++, k++) {

		if(!splitter.includes(data[i]) && !splitter.includes(data[j]) && !splitter.includes(data[k])) {
			
			if (vowels.includes(data[i].toLowerCase())) {
				if (vowels.includes(data[j].toLowerCase())) {
					if (vowels.includes(data[k].toLowerCase()))
						classes['vvv'].push(data[i]+data[j]+data[k])
					else
						classes['vvc'].push(data[i]+data[j]+data[k])
				}
				else {
					if (vowels.includes(data[k].toLowerCase()))
						classes['vcv'].push(data[i]+data[j]+data[k])
					else
						classes['vcc'].push(data[i]+data[j]+data[k])
				}
			}
			else {
				if (vowels.includes(data[j].toLowerCase())) {
					if (vowels.includes(data[k].toLowerCase()))
						classes['cvv'].push(data[i]+data[j]+data[k])
					else
						classes['cvc'].push(data[i]+data[j]+data[k])
				}
				else {
					if (vowels.includes(data[k].toLowerCase()))
						classes['ccv'].push(data[i]+data[j]+data[k])
					else
						classes['ccc'].push(data[i]+data[j]+data[k])
				}
			}
		}
	}
	sortClasses(data.length);
}

function sortClasses(quantity)
{
	let res = title;
	for (let i of Object.keys(classes))
		res += 'Класс ' + toClassName(i) + ': ' + classes[i].length / quantity + '% ' + '(' + classes[i].length + ' раз)' + '\n'
	download('classes.txt', res)
}

function toClassName(i) {
	switch(i) {
		case 'vvv':
			return 'Гласная-Гласная-Гласная';
			break;
		case 'vvc':
			return 'Гласная-Гласная-Согласная';
			break;
		case 'vcv':
			return 'Гласная-Согласная-Гласная';
			break;
		case 'vcc':
			return 'Гласная-Согласная-Согласная';
			break;
		case 'cvv':
			return 'Согласная-Гласная-Гласная';
			break;
		case 'cvc':
			return 'Согласная-Гласная-Согласная';
			break;
		case 'ccv':
			return 'Согласная-Согласная-Гласная';
			break;
		case 'ccc':
			return 'Согласная-Согласная-Согласная';
			break;
	}
}
