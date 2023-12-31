import S from './header.module.css'
import logoCoffe from '../../assets/Logo.svg'
import logoLocal from '../../assets/Icon.svg'
import logoCar from '../../assets/car.svg'
import { Link } from 'react-router-dom'

function Header() {
    return(
        <header className={S['header-coffe']}>
          <img src={logoCoffe} alt="logoCoffe" />
        <div className={S['container-local']}>
            <div className={S['local']}>
              <img src={logoLocal} alt="" />
              <p>Porto Alegre, Rs</p>
             </div>
             <Link to='/checkout'>
             <img className={S['logo-car']} src={logoCar} alt="" />
             </Link>
        </div>
        </header>
        )
    }
    
    
    export default Header;