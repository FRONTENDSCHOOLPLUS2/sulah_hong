import Button from "@components/Button";
import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValue {
  name: string;
  email: string;
  password: string;
  type: "user" | "seller";
  profileImage?: string
}

function Signup() {
  const { send: fileUpload } = useMutation("files", {
    method: "POST",
    headers: {},
  });

  const { send } = useMutation("users", {
    method: "POST",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>({
    values: {
      email: "yaya@market.com",
      password: "12345678",
      name: "yaya",
      type: "user",
      profileImage:""
    },
  });

  const onSignup: SubmitHandler<FormValue> = async (formData) => {
    try {
      if (formData.profileImage == "undefind" && formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("attach", formData.profileImage[0]);
        // console.log()

        const fileRes = await fileUpload({
          body: imageFormData,
        });
        console.log(fileRes);
        formData.profileImage = fileRes.item[0].path;
      } else {
        delete formData.profileImage;
      }

      const result = await send({
        body: JSON.stringify(formData),
      });
      console.log(result);
      reset();
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSignup)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("name", {
                required: "이름을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "이름을 2글자 이상 입력하세요.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.name && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: "이메일은 필수 입니다.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: "비밀번호는 필수 입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 입력하세요.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register("profileImage")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
