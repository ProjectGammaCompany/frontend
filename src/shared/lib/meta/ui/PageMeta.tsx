interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta = ({ title, description }: PageMetaProps) => {
  return (
    <>
      <meta name="title" content={"EduPlay – " + title} />
      <meta name="description" content={description} />
    </>
  );
};

export default PageMeta;
