import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useFetch from "@hooks/useFetch";
import ListItem from "@pages/community/ListItem";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PostData } from "../../types/community";

function List() {
  const limit = 10
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { loading, data, error, pagination, refetch } = useFetch<PostData>(`posts?type=${type}&limit=${limit}&page=${page}`);

  const items = data?.item.map((item) => (
    <ListItem key={item._id} item={item} />
  ));

  useEffect(() => {
    refetch();
  }, [type, page]);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <Search />
        <Button onClick={() => navigate(`/${type}/new`)}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}

            {loading && (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  로딩중...
                </td>
              </tr>
            )}

            {/* 에러 메세지 출력 */}
            {error && (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  {error.messege}
                </td>
              </tr>
            )}

            {items}
          </tbody>
        </table>
        <hr />
        {data && <Pagination type={type} totalPages={pagination?.totalPages} />}
      </section>
    </main>
  );
}

export default List;
