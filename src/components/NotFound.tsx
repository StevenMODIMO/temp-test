"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function NotFound({
  title,
  textColor = "#232323",
  linkColor = "#2563eb",
}: {
  title?: string;
  textColor?: string;
  linkColor?: string;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="text-center my-20">
      <h1
        style={{ color: textColor }}
        className="text-[18px] lg:text-[20px] xl:text-[25px]"
      >
        {title || t("notFound")}
      </h1>
      <p
        onClick={handleRefresh}
        style={{ color: linkColor }}
        className="cursor-pointer lg:text-md xl:text-xl"
      >
        {t("reload")}
      </p>
    </div>
  );
}
