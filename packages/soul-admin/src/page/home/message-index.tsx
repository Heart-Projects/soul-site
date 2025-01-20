import { useTranslation } from "react-i18next";
const MessageIndex = () => {
  const { t } = useTranslation();
  return <div>messageIndex {t("hello")}</div>;
};
export default MessageIndex;
