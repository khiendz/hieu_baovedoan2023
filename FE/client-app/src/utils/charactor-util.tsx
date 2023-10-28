export function removeAccents(str: string) {
    let regex = new RegExp('[\\u0' + '300-\\u0' + '36f]', 'g');
    return str.normalize('NFD')
        .replace(regex, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export function highlightSearchResults(text:string, dataSearch:any) {
    const regex = new RegExp(dataSearch, "gi");
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      parts.push(text.slice(lastIndex, match.index));
      parts.push(<span className={"highlight"}>{match[0]}</span>);
      lastIndex = match.index + match[0].length;
    } 
    parts.push(text.slice(lastIndex));

    return parts;
  }