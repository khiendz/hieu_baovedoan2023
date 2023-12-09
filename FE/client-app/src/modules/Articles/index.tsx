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
    if (result && result?.status == 200) setArticles(result.data.reverse());
  };

  return articles
    ? articles?.map((el: Article, index) => (
        <article className={`dk-w-[1080px] ${index != 0 ? "dk-border-t-4 dk-pt-11" : ""}`} key={index}>
          <Link className="dk-w-fit dk-h-fit" href={`/article/${el.ArticleId}`}>
            <img
              src={JoinFileCDN(el.Thumb)}
              className="dk-w-[1080px] dk-aspect-[3/2] dk-rounded-md"
            />
          </Link>
          <h2 className="dk-Inter dk-mt-3 dk-leading-10 dk-font-semibold dk-text-[36px]">
            <Link href={`/article/${el.ArticleId}`}>
                {el.Title}</Link>
          </h2>
          <h3 className="dk-Inter dk-mt-3 dk-leading-6 dk-text-[20px]">
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
