import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App



/*
  const container = useRef();
  
  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
      },
      []
    );
    
    return (
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}> 
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

// export default memo(TradingViewWidget);

 */