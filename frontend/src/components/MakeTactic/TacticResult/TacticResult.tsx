import { useEffect, useState } from "react";
import CandleChart from "../../Chart/CandleChart";
import useComponentSize from "../../Util/ComponentSize";
import {
  CenterDiv,
  HistoryChartDiv,
  HistorySaveButton,
  HistorySummary,
  HistorySummaryContents,
  HistorySummaryContentsItem,
  HistorySummaryContentsItemLeft,
  HistorySummaryContentsItemRight,
  HistorySummaryContentsResult,
  ItemList,
  LeftDiv,
  OptionHistoryItemList,
  OptionHistoryItemPosCenter,
  OptionHistoryItemPosDown,
  OptionHistoryItemPosLeft,
  OptionHistoryItemPosRight,
  OptionHistoryItemPosUp,
  OptionHistoryItemTitle,
  RightDiv,
  TacticTitle,
  TradingHistoryContainer,
  TradingHistoryContents,
  TradingHistoryDiv,
  TradingHistoryTitle,
} from "./TacticResult.style";
import OptionHistoryItem from "./OptionHistoryItem";
import { format } from "d3-format";
import { tacticTest, tacticTestProps } from "../../../api/Tactic/TacticTest";

export interface saveTacticProps {
  title: string;
  optionCode: string;
  taticJsonCode: string;
  tacticPythonCode: string;
  testReturns: string;
}

const TacticResult = (props) => {
  const [componentRef, size] = useComponentSize();
  const [optionHistory, setOptionHistory] = useState<any>([]);
  const [chartInfos, setChartInfos] = useState<any[]>([]);
  const [startAsset, setStartAsset] = useState(0);
  const [endAsset, setEndAssets] = useState(0);
  const [returnPercent, setReturnPercent] = useState(0);
  // const [title, setTitle] = useState("");
  // const [optionCode, setOptionCode] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const [term, setTerm] = useState("");
  // const [round, setRound] = useState("");
  const pricesDisplayFormat = format(",");
  const axiosGetData = async () => {
    const tacticTestData: tacticTestProps = {
      optionCode: props.optionCode,
      tacticPythonCode: props.tacticPythonCode,
      tacticJsonCode: props.tacticJsonCode,
      startAsset: props.startAsset,
      startTime: returnDate(),
      term: props.term,
      repeatCnt: props.repeatCnt,
    };
    // const res = await tacticTest(tacticTestData);
    const res = dummyData;
    console.log("결과~~~~~~~~~~~~~");
    console.log(res);
    setOptionHistory(res.optionHistory);
    // let newChart: any[] = [];
    // res.chartInfos.forEach((element) => {
    //   newChart.push({
    //     date: element.date.toString(),
    //     time: element.time.toString(),
    //     open: element.open,
    //     high: element.high,
    //     low: element.low,
    //     close: element.close,
    //     volume: element.volume,
    //   });
    // });
    // console.log(newChart);
    // setChartInfos(newChart);
    setChartInfos(res.chartInfos);
    setStartAsset(res.startAsset);
    setEndAssets(res.endAsset);
    setReturnPercent(res.returnPercent);
  };

  const returnDate = () => {
    const today = props.startDate;
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  };

  // const downloadImg = () => {
  //   const svgBlob = new Blob([props.tacticImg], { type: 'image/svg+xml' });
  //   const svgUrl = URL.createObjectURL(svgBlob);

  //   // 다운로드 링크를 생성하고 클릭합니다.
  //   const a = document.createElement('a');
  //   a.href = svgUrl;
  //   a.download = "tmp.svg";
  //   a.click();

  //   // 사용이 끝난 URL 객체를 해제합니다.
  //   URL.revokeObjectURL(svgUrl);
  //   console.log(svgUrl);
  // };

  //   console.log(componentRef);
  // }, [componentRef]);

  useEffect(() => {
    axiosGetData();
    console.log("res useEffect");
    console.log(chartInfos);
  }, []);

  // post tactic api
  const uploadData = async (requestData) => {
    const formData = new FormData();
    formData.append("data", requestData);
    // formData.append('title', postData.title);
    // formData.append('optionCode', postData.optionCode);
    // formData.append('taticJsonCode', postData.taticJsonCode);
    // formData.append('tacticPythonCode', postData.tacticPythonCode);
    // formData.append('testReturns', postData.testReturns);

    console.log(formData);
    // try {
    //     const response = await axios.post('/upload', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });

    //     if (response.status === 200) {
    //         console.log('이미지와 문자열 데이터가 성공적으로 업로드되었습니다.');
    //     } else {
    //         console.error('데이터 업로드 중 오류가 발생했습니다.');
    //     }
    // } catch (error) {
    //     console.error('네트워크 오류:', error);
    // }
  };

  const saveTactic = () => {
    const requestProps = {
      title: props.title,
      optionCode: props.optionCode,
      taticJsonCode: props.tacticJsonCode,
      tacticPythonCode: props.tacticPythonCode,
      testReturns: returnPercent.toString(),
      tacticImg: props.tacticImg,
    };
    uploadData(requestProps);
    console.log(requestProps);
  };

  return (
    <TradingHistoryContainer>
      {/* 전략 이름 */}
      <TradingHistoryTitle style={{fontSize:"22px"}}>{props.title}</TradingHistoryTitle>
      {/* {props.tacticImg ? <img src={props.tacticImg}/>:<></>} */}

      <TradingHistoryContents>
        {/* 매매내역 */}
        <LeftDiv>
          <TradingHistoryDiv>
            <TradingHistoryTitle>매매내역</TradingHistoryTitle>
            <OptionHistoryItemList>
              <OptionHistoryItemTitle>
                <OptionHistoryItemPosLeft>유형</OptionHistoryItemPosLeft>
                <OptionHistoryItemPosCenter>
                  <OptionHistoryItemPosUp>가격(수량)</OptionHistoryItemPosUp>
                  <OptionHistoryItemPosDown>수수료</OptionHistoryItemPosDown>
                </OptionHistoryItemPosCenter>
                <OptionHistoryItemPosRight>
                  <OptionHistoryItemPosUp>체결금액</OptionHistoryItemPosUp>
                  <OptionHistoryItemPosDown>실현손익</OptionHistoryItemPosDown>
                </OptionHistoryItemPosRight>
              </OptionHistoryItemTitle>
              <ItemList>
                {optionHistory.map((item, index) => (
                  <OptionHistoryItem
                    item={item}
                    repeatCnt={props.repeatCnt}
                    key={index}
                  ></OptionHistoryItem>
                ))}
              </ItemList>
            </OptionHistoryItemList>
          </TradingHistoryDiv>
        </LeftDiv>
        <CenterDiv>
          <HistoryChartDiv ref={componentRef}>
            <TradingHistoryTitle>매매내역 상세</TradingHistoryTitle>
            {/* <div >
                        <p>가로너비: {size.width}px</p>
                        <p>세로너비: {size.height}px</p>
                    </div> */}
            {/* 차트 */}
            {size.width > 0 &&
            size.height > 0 &&
            chartInfos !== undefined &&
            chartInfos.length > 0 ? (
              <CandleChart
                curwidth={size.width - 10}
                curheight={size.height - 10}
                optionHistory={optionHistory}
                chartInfos={chartInfos}
              ></CandleChart>
            ) : (
              <></>
            )}
          </HistoryChartDiv>
        </CenterDiv>
        <RightDiv>
          <HistorySummary>
            <HistorySummaryContents>
              <TradingHistoryTitle>요약</TradingHistoryTitle>
              <HistorySummaryContentsResult>
                <div style={{ fontSize: "14px" }}>초기자산</div>
                <div style={{ fontSize: "13px" }}>{pricesDisplayFormat(startAsset)}원</div>
                <div>↓</div>
                <div style={{ fontSize: "14px" }}>최종자산</div>
                <div style={{ fontSize: "16px", color: "#F24822" }}>
                  {pricesDisplayFormat(startAsset * returnPercent)}원
                </div>
              </HistorySummaryContentsResult>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>종목:</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>
                  {props.optionName}({props.optionCode})
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>주기/횟수</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>
                  {props.term}/{props.repeatCnt}
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>시작 일자</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>
                  {props.startDate.toLocaleDateString()}
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>수익률</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight style={{ color: "#F24822" }}>
                  {pricesDisplayFormat(returnPercent)}%
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>수익금</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>
                  {pricesDisplayFormat(startAsset * returnPercent - startAsset)}
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>수수료 및 세금</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>???</HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
              <HistorySummaryContentsItem>
                <HistorySummaryContentsItemLeft>총 거래 횟수</HistorySummaryContentsItemLeft>
                <HistorySummaryContentsItemRight>
                  {optionHistory.length}
                </HistorySummaryContentsItemRight>
              </HistorySummaryContentsItem>
            </HistorySummaryContents>

            {/* 버튼 */}
            <HistorySaveButton onClick={saveTactic}>저장하기</HistorySaveButton>
            {/* <HistorySaveButton onClick={downloadImg}>이미지</HistorySaveButton> */}
            {props.tacticImg ? <img src={props.tacticImg} /> : <></>}
          </HistorySummary>
        </RightDiv>
      </TradingHistoryContents>
    </TradingHistoryContainer>
  );
};

export default TacticResult;

const dummyData = {
  optionHistory: [
    {
      type: "buy",
      turn: 2, // 몇 번째 턴
      cost: 8000, // 주식 가격
      tradeCnt: 350, // 거래 수
      profitAndLoss: 12, // 실현손익 : (매도 평균 - 매수 평균) * 매도 수량
    },
    {
      type: "sell",
      turn: 4,
      cost: 7000,
      tradeCnt: 300,
      profitAndLoss: 12,
    },
    {
      type: "buy",
      turn: 2, // 몇 번째 턴
      cost: 8000, // 주식 가격
      tradeCnt: 350, // 거래 수
      profitAndLoss: 12, // 실현손익 : (매도 평균 - 매수 평균) * 매도 수량
    },
    {
      type: "sell",
      turn: 4,
      cost: 7000,
      tradeCnt: 300,
      profitAndLoss: 12,
    },
    {
      type: "buy",
      turn: 2, // 몇 번째 턴
      cost: 8000, // 주식 가격
      tradeCnt: 350, // 거래 수
      profitAndLoss: 12, // 실현손익 : (매도 평균 - 매수 평균) * 매도 수량
    },
    {
      type: "sell",
      turn: 4,
      cost: 7000,
      tradeCnt: 300,
      profitAndLoss: 12,
    },{
      type: "buy",
      turn: 2, // 몇 번째 턴
      cost: 8000, // 주식 가격
      tradeCnt: 350, // 거래 수
      profitAndLoss: 12, // 실현손익 : (매도 평균 - 매수 평균) * 매도 수량
    },
    {
      type: "sell",
      turn: 4,
      cost: 7000,
      tradeCnt: 300,
      profitAndLoss: 12,
    },
  ],
  chartInfos: [
    // "opens": [],   // 시가
    // "highs": [],   // 고가
    // "lows": [],    // 저가
    // "closes": [],  // 종가
    // "vols": [],    // 거래량
    // "dates": [],    // 일자
    // "tiems": [],    // 시간
    {
      date: "20210202",
      time: "1600",
      open: 134.9307,
      low: 134.9105,
      high: 135.0215,
      close: 135.0087,
      volume: 73591581,
    },
    {
      date: "20210202",
      time: "1545",
      open: 134.9707,
      low: 134.9307,
      high: 134.9707,
      close: 134.9307,
      volume: 67639193,
    },
    {
      date: "20210202",
      time: "1530",
      open: 134.6608,
      low: 134.6608,
      high: 134.975,
      close: 134.975,
      volume: 64815258,
    },
    {
      date: "20210202",
      time: "1515",
      open: 134.8585,
      low: 134.6237,
      high: 134.9716,
      close: 134.6608,
      volume: 66869896,
    },
    {
      date: "20210202",
      time: "1500",
      open: 134.2585,
      low: 134.1237,
      high: 134.2716,
      close: 134.1968,
      volume: 82892896,
    },
    {
      date: "20210202",
      time: "1445",
      open: 134.8585,
      low: 134.6237,
      high: 134.9716,
      close: 134.6608,
      volume: 77892896,
    },
  ],
  startAsset: 10000000, // 초기 자산
  endAsset: 143001230, // 최종 자산
  returnPercent: 1.7, // 수익률
};

// useEffect(() => {
