import { LayoutV2 } from './app/LayoutV2'
import { ConfigProvider } from './entities/config/ConfigContext'

function App() {
    return (
        <ConfigProvider>
            <LayoutV2 />
        </ConfigProvider>
    )
}

export default App
