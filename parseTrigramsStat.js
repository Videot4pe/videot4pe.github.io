const splitter = [' ', '.', ',', '-', '?', '!', ':', '\'', '\"', '\n', '(', ')', '»', '«', '…', '„', '“'];

function parseTrigrams(data) {

	let triphones = [];
	for (let i = 0, j = i + 1, k = j + 1; i < data.length - 2, j < data.length - 1, k < data.length; i++, j++, k++) {
		if(!splitter.includes(data[i]) && !splitter.includes(data[j]) && !splitter.includes(data[k]))
		{
			let position = '';
			if (i > 0 && data[i-1] == ' ')
				position = 'start';
			else if (k < data.length - 1 && data[k+1] == ' ')
				position = 'end';
			else
				position = 'mid';

			let word = '';
			let l = i;
			while(!splitter.includes(data[l]))
				l--;
			l++;
			while(!splitter.includes(data[l]))
			{
				if (l == i || l == j || l == k)
					word += data[l].toUpperCase();
				else
					word += data[l];
				l++;
			}
			triphones.push({triphone: (data[i]+data[j]+data[k]), position: position, word: word});
		}
	}
	stat(triphones);
}

function stat(triphones)
{
	let stat = {};
	for (let i = 0; i < triphones.length; i++)
	{
		if (stat[triphones[i].triphone])
		{
			stat[triphones[i].triphone].counter++;
			stat[triphones[i].triphone].position[triphones[i].position]++;
			if (!stat[triphones[i].triphone].words.includes(triphones[i].word))
				stat[triphones[i].triphone].words.push(triphones[i].word);
		}
		else
		{
			stat[triphones[i].triphone] = {};
			stat[triphones[i].triphone].counter = 1;
			stat[triphones[i].triphone].position = {'start': 0, 'mid': 0, 'end': 0};
			stat[triphones[i].triphone].position[triphones[i].position]++;
			stat[triphones[i].triphone].words = [triphones[i].word];
		}
	}

	sortTrigramms(stat);
}

function sortTrigramms(stat)
{
	let res = '';
	for (let i of Object.keys(stat))
		res += i + ' - количество: ' + stat[i].counter + '. Из них: в начале: ' + stat[i].position.start + '; в середине: ' + stat[i].position.mid + '; в конце: ' + stat[i].position.end + '\n' + 'В словах: [' + stat[i].words + ']\n\n';
	download('trigrams.txt', res)
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();

	document.body.removeChild(element);
}