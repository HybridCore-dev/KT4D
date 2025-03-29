import { useRouter } from "next/navigation";
import useDictionary from "./useDictionary";

import { UserStatus } from "@/actions/user/typing";
import { alert } from "@/components/platform/confirm";

export default function useUserStatus() {
  const router = useRouter();
  const { locale } = useDictionary();

  const navigateTo = (status: UserStatus) => {
    switch (status.current) {
      case "QUIZ_INPROGRESS":
        router.push(`/${locale}/quiz/session`);
        break;
      case "QUIZ_COMPLETED":
        router.push(`/${locale}/quiz/results`);
        break;
      case "DOCUMENT_TYPE_SELECTION":
        router.push(`/${locale}/document-type-selection`);
        break;
      case "PLATFORM_STRUCTURE_INFO":
        router.push(`/${locale}/platform-structure`);
        break;
      case "WAITING_OTHER_USERS":
        router.push(`/${locale}/prompt/start`);
        break;
      case "PROMPT":
        router.push(`/${locale}/prompt/session`);
        break;

      default:
        alert(
          "Error!",
          `Unknown user status step!\nCurrent: ${status.current}\nNext: ${status.next}`
        );
        console.log(status);

        break;
    }
  };

  return {
    navigateTo,
  };
}
