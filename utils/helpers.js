export const objPretty = (obj) => {
  return JSON.stringify(obj, undefined, 2);
};

export const synopsisFixFormat = (synopsis) => {
  synopsis = synopsis.split('<br>').join(' ');
  synopsis = synopsis.split('&rdquo;').join('');
  synopsis = synopsis.split('&ldquo;').join('');
  synopsis = synopsis.split('&rsquo;').join('');

  return synopsis;
}

export const synopsisFixLength = (synopsis, len) => {
  if(synopsis.length > len){
    synopsis = synopsis.substring(0, len);

    let synarr = synopsis.split(' ');
    let lastword = synarr.pop();
    synopsis = synarr.join(' ');
    synopsis += " ...";
  }

  return synopsis;
}

export const strSlugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-');

    return str;
}


export const cleanHtml = (html, tagsToLeaveArray) => {
  let htmlClean = "";
  let searchRegExp = "";
  let replaceWith = "";

  // Replace special quotes
  searchRegExp = /“|”/g;
  replaceWith = '"';
  htmlClean = html.replace(searchRegExp, replaceWith);

  // Replace special hifens
  searchRegExp = /—/g;
  replaceWith = "-";
  htmlClean = htmlClean.replace(searchRegExp, replaceWith);

  // Replace special apostroph
  searchRegExp = /’/g;
  replaceWith = "'";
  htmlClean = htmlClean.replace(searchRegExp, replaceWith);

  // Replace special bulleten
  searchRegExp = /•/g;
  replaceWith = "&bull;";
  htmlClean = htmlClean.replace(searchRegExp, replaceWith);

  // Replace <\p> with <br><br>
  searchRegExp = /<\/p>/g;
  replaceWith = "<br><br>";
  htmlClean = htmlClean.replace(searchRegExp, replaceWith);

  // Replace <p> with empty string
  searchRegExp = /<p>/g;
  replaceWith = "";
  htmlClean = htmlClean.replace(searchRegExp, replaceWith);

  if (tagsToLeaveArray === undefined) {
    tagsToLeaveArray = ["p", "b", "strong", "i", "em", "br"];
  }

  let tagsToLeave = "";
  tagsToLeaveArray.forEach((tag) => {
    tagsToLeave += `(?!${tag})`;
  });

  let re = `<\\/?${tagsToLeave}\\w*\\b[^>]*>`;
  re = new RegExp(re, "gi");
  htmlClean = htmlClean.replace(re, "");

  return htmlClean;
};