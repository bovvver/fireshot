import { useState, useEffect, useRef, Fragment } from "react";
import HomePost from "@components/organisms/HomePost/HomePost";
import { HomeContainer, PostSkeleton } from "./Home.styles";
import { executeHomePagePagination } from "@api/HomePageService";
import { Photo } from "@customTypes/api";
import NoPostsPage from "@components/molecules/NoPostsPage/NoPostsPage";
import { useToast } from "@hooks/contextHooks";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<Photo[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElementIndex, setLastElementIndex] = useState<number | null>(null);
  const { handleToastOpening } = useToast();
  const TOTAL_PAGES = 15;

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const callApi = async () => {
    try {
      setLoading(true);
      const response = await executeHomePagePagination(pageNum);
      const responseContent = response.data.body!.content;
      const all = new Set([...allPosts, ...responseContent]);
      setAllPosts([...all]);
      setLoading(false);
    } catch (e) {
      handleToastOpening("Couldn't fetch posts.", "warning");
    }
  };

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      callApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  useEffect(() => {
    const currentObserver = observer.current;

    if (lastElementIndex !== null) {
      const currentElement = document.getElementById(
        `post-${lastElementIndex}`
      );
      if (currentElement) {
        currentObserver.observe(currentElement);
      }
    }

    return () => {
      if (lastElementIndex !== null) {
        const currentElement = document.getElementById(
          `post-${lastElementIndex}`
        );
        if (currentElement) {
          currentObserver.unobserve(currentElement);
        }
      }
    };
  }, [lastElementIndex]);

  return (
    <HomeContainer>
      {allPosts.length > 0 &&
        allPosts.map((post, i) => {
          return (
            <Fragment key={i}>
              {i === allPosts.length - 1 &&
              !loading &&
              pageNum <= TOTAL_PAGES ? (
                <div
                  key={post.id}
                  id={`post-${i}`}
                  ref={(el) => el && setLastElementIndex(i)}
                >
                  <HomePost post={post} />
                </div>
              ) : (
                <div key={post.id} id={`post-${i}`}>
                  <HomePost post={post} />
                </div>
              )}
            </Fragment>
          );
        })}
      {allPosts.length === 0 && !loading ? <NoPostsPage /> : null}
      {loading ? <PostSkeleton /> : null}
    </HomeContainer>
  );
};

export default Home;
