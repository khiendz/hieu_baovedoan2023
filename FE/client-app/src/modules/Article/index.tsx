import { Article } from "Models/Article.model";
import { useEffect, useState } from "react";
import { JoinFileCDN } from "services";
import { getArticleById } from "services/article-service";
export default function ArticleContent(props: any) {
  const { id } = props;
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    if (id) {
        initData();
    }
  }, [id]);

  const initData = async () => {
    const result = await getArticleById(id);
    if (result) setArticle(result);
  };

  return article ? (
    <div className="dk-w-[1080px] dk-flex dk-flex-col dk-justify-center dk-items-center dk-gap-4">
      <h1 className="dk-text-[36px] dk-font-Inter dk-font-bold dk-text-center">{article.Title}</h1>
      <h2 className="dk-text-[20px] dk-font-Inter dk-font-medium" dangerouslySetInnerHTML={{ __html: article.Description }}></h2>
      <img
        src={JoinFileCDN(article.Thumb)}
        className="dk-w-[680px] dk-aspect-[3/2] dk-rounded-md"
      />
      <div
        className="dk-w-[1080px]"
        dangerouslySetInnerHTML={{ __html: article.Content }}
      ></div>
    </div>
  ) : null;
}
