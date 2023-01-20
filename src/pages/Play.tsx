import { yearList } from "components/admin/quiz/NewQuizInfo";
import { quizSubjectList } from "interfaces/Quiz";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { usePlay } from "store/usePlay";

interface Params {
  id: string;
}

export const Play = (props: any) => {
  const match = useRouteMatch();
  const { gameInfo, getGameInfo, setGameInfo } = usePlay();
  const [checkSetting, setCheckSetting] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  const id = useMemo(() => {
    return (match.params as Params).id;
  }, [match]);

  useEffect(() => {
    if (id) {
      getGameInfo(id);
    }
  }, [id]);

  useEffect(() => {
    if (!checkSetting && gameInfo) {
      setCheckSetting(true);
      if (gameInfo.isPlaySetting) {
        setShowSettingModal(true);
      }
    }
  }, [gameInfo, checkSetting]);

  const startGame = () => {
    setShowSettingModal(false);

    // 문제 불러오기
  };

  return (
    <>
      <div>play</div>

      <Modal show={showSettingModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>
            {gameInfo?.title} <small>({gameInfo?.type})</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gameInfo && (
            <Form className="text-start">
              <Form.Group className="new-game__size mb-4">
                <Form.Label>크기 (가로 x 세로) </Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.sizeX}
                    onChange={e => setGameInfo("sizeX", Number(e.target.value))}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`sizeX_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.sizeY}
                    onChange={e => setGameInfo("sizeY", Number(e.target.value))}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`sizeY${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group className="new-game__group mb-4">
                <Form.Label>모둠수</Form.Label>
                <Form.Select
                  value={gameInfo.groupCount}
                  onChange={e =>
                    setGameInfo("groupCount", Number(e.target.value))
                  }
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <option key={`groupCount_${i}`} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>과목</Form.Label>
                <Form.Select
                  value={gameInfo.subject}
                  onChange={e => setGameInfo("subject", e.target.value)}
                >
                  {["랜덤", ...quizSubjectList].map(item => (
                    <option key={`subject${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="new-game__year mb-4">
                <Form.Label>과정</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.yearStart}
                    onChange={e =>
                      setGameInfo("yearStart", Number(e.target.value))
                    }
                  >
                    {yearList.map(item => (
                      <option key={`yearStart_${item[0]}`} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.yearEnd}
                    onChange={e =>
                      setGameInfo("yearEnd", Number(e.target.value))
                    }
                  >
                    {yearList.map(item => (
                      <option key={`yearEnd_${item[0]}`} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group className="new-game__size mb-4">
                <Form.Label>난이도</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.difficultyStart}
                    onChange={e =>
                      setGameInfo("difficultyStart", Number(e.target.value))
                    }
                  >
                    {Array(10)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`difficultyStart_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.difficultyEnd}
                    onChange={e =>
                      setGameInfo("difficultyEnd", Number(e.target.value))
                    }
                  >
                    {Array(10)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`difficultyEnd_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={startGame}>
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};