import * as showdown from 'showdown';

const converter = new showdown.Converter();

const convertMarkdown = (markdown: string) => {
  return converter.makeHtml(markdown);
};

export default convertMarkdown;