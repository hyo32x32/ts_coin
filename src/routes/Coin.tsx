import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Routes, Route, useLocation, useParams, useMatch } from "react-router";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Loading from "./Loading";

const Container = styled.div`
  padding: 0px 20px; //위아래 좌우
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  top: -15px;
`;
const Nav = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  a {
    margin-left: 20px;
    text-decoration: none;
  }
`;

// styled(Link)``;를 해주면 Link의 모든 속성을 inherit하면서 새로운 속성을 더해줄 수 있다.
const BackBtn = styled(Link)`
  color: ${(props) => props.theme.textColor};
  /* color: red; */
  background-color: ${(props) => props.theme.coinBgColor};
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  top: 50px;
`;

const Header = styled.header`
  height: 10vh;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between; // 빈 공간을 균등하게 나누어 아이템 사이에 간격을 만듦
  background-color: ${(props) => props.theme.coinBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.coinBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  /* border-color: ${(props) =>
    props.isActive ? "3px 3px 3px black;" : ""}; */
  box-shadow: ${(props) => (props.isActive ? "1px 1px 2px 0.1px;" : "")};
`;

// interface

interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams(); // 사용자가 입력한 파라미터 값 저장 됨
  const location = useLocation();
  const state = location.state as RouteState;
  const priceMatch = useMatch("/:coinId/price"); // "/~"라는 url이 있는지 확인해달라
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId) //argument가 필요하기 때문에 이러한 형태로 씀
  );
  const loading = infoLoading || tickersLoading;
  // console.log(state.name);
  return (
    <Container>
      <Helmet>
        <title>
          {/* state는 넘겨 받아온 것!! Coins.tsx 에서 */}
          {state?.name ? state.name : loading ? <Loading /> : infoData?.name}
        </title>
      </Helmet>
      <Nav>
        <BackBtn to="/"> ← back</BackBtn>
      </Nav>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? <Loading /> : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="price" element={<Price coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
