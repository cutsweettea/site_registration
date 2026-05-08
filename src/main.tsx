import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './app.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Verify from './verify.tsx'

const DEFAULT_REDIR = 'https://jugg.school/login';
createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/:ref' element={<Verify element={<Register redir={DEFAULT_REDIR}/>} redir={DEFAULT_REDIR}/>}/>
			<Route path='/*' Component={() => {
				window.location.href = DEFAULT_REDIR;
				return null;
			}}/>
		</Routes>
	</BrowserRouter>
)
