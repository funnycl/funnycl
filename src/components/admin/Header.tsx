import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import _ from "lodash";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const { isLogin } = useLogin();
  const { subMenu } = useMenus();
  const { newQuiz } = useQuiz();

  const disabledSaveButton = useMemo(() => {
    if (_.isEmpty(newQuiz.title)) {
      return true;
    }

    if (newQuiz.type === "WORK_SHEET") {
      if (newQuiz.image === null) {
        return true;
      }

      if (newQuiz.answerType === "SHORT_ANSWER_QUESTION") {
        if (_.isEmpty(newQuiz.shortAnswerQuestionInfo?.answer)) {
          return true;
        }
      } else {
        return true;
      }
    }

    return false;
  }, [newQuiz]);

  const onClickSaveQuiz = () => {
    console.log("onClickSaveQuiz");

    if (_.isNil(auth.currentUser?.uid)) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 이미지를 저장 하고

    // 문제 저장
    const db = getDatabase();

    // Get a key for a new Post.
    const quizUrl = `quiz/${auth.currentUser?.uid}`;
    const newPostKey = push(child(ref(db), quizUrl)).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: any = {};
    updates[`${quizUrl}/${newPostKey}`] = _.pick(newQuiz, [
      "title",
      "type",
      "subject"
    ]);

    return update(ref(db), updates);
  };

  return (
    <div className="header px-3 py-2 border-bottom align-items-center">
      <div>퍼니클</div>
      <div className="d-flex align-items-center">
        {subMenu === "CREATE_QUIZ" && newQuiz.type !== "NONE" && (
          <div className="me-5">
            <Button
              size="sm"
              disabled={disabledSaveButton}
              onClick={onClickSaveQuiz}
            >
              저장
            </Button>
          </div>
        )}

        {subMenu === "QUIZ_LIST" && (
          <div className="me-3">
            <Link className="btn btn-primary btn-sm" to="/admin/quiz/create">
              새로운 문제 만들기
            </Link>
          </div>
        )}
        <div className="me-3">{auth.currentUser?.email}</div>
        {isLogin && (
          <div className="logout-button" onClick={() => auth.signOut()}>
            <LogoutIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
