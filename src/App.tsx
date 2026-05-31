import { ConfigProvider } from "./context/ConfigContext";
import { LayoutV2 } from "./components/LayoutV2";

function App() {
	return (
		<ConfigProvider>
			<LayoutV2 />
		</ConfigProvider>
	);
}

export default App;
