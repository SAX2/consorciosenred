import { cookies } from 'next/headers';
import HeaderComponent from './component';

const Header = async () => {
  const cookie = await cookies()
  const unit = cookie.get('unit')

  const isSingleUnit = unit && parseInt(unit.value) === 1 ? true : false

  return <HeaderComponent isSingleUnit={isSingleUnit} />
};

export default Header;