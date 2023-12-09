import { Article } from "Models/Article.model";
import Link from "next/link";
import { useEffect, useState } from "react";
import { JoinFileCDN } from "services";
import { getAllArticle } from "services/article-service";
export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const result = await getAllArticle();
    if (result && result?.status == 200) setArticles(result.data);
  };

  return articles
    ? articles?.map((el: Article, index) => (
        <article className="dk-w-[500px]" key={index}>
          <Link className="dk-w-fit dk-h-fit" href={`/article/${el.ArticleId}`}>
            <img
              src={JoinFileCDN(el.Thumb)}
              className="dk-w-[500px] dk-aspect-[3/2] dk-rounded-md"
            />
          </Link>
          <h2 className="dk-Inter dk-mt-3 dk-leading-6 dk-font-semibold">
            <Link href={`/article/${el.ArticleId}`}>
                {el.Title}</Link>
          </h2>
          <h3 className="dk-Inter dk-mt-3 dk-leading-6">
            <Link href={`/article/${el.ArticleId}`}>
                <div
                    dangerouslySetInnerHTML={{ __html: el.Description }}
                >
                </div>
            </Link>
          </h3>
        </article>
      ))
    : null;
}
