import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;

  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(`firstName`),
  age: yup.number().positive().integer().required(`age`),
  password: yup
    .string()
    .required("入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください"
    ),
  confirmPassword: yup
    .string()
    .required("入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください"
    )
    .oneOf([yup.ref("password"), null], "確認用パスワードが一致していません")
});

export const PasswordDialog = ({
  onSubmit,
  onClose,
  onCancel
}: {
  onSubmit: () => void;
  onClose: (event: any) => void;
  onCancel: (event: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "firstName?",
      lastName: "lastName?"
    }
  });
  const doSubmit = (data: IFormInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      <label className="block">
        <p>Abbb1234?</p>
        <label>新しいパスワード</label>
        <input
          id="password"
          type="password"
          className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
            errors.password ? "border-red-400" : ""
          }`}
          {...register("password")}
        />
        <br />
        {errors.password?.message}
      </label>
      <br />
      <label className="block mt-5">
        <label>新しいパスワード(確認用)</label>
        <input
          id="confirmPassword"
          type="password"
          className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
            errors.confirmPassword ? "border-red-400" : ""
          }`}
          {...register("confirmPassword")}
        />
        <br />
        {errors.confirmPassword?.message}
      </label>
      <input type="submit" />
    </form>
  );
};
