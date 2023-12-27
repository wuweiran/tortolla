import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const MarkdownPreview = (props: { source: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: md.render(props.source) }} />;
};

export default MarkdownPreview;
