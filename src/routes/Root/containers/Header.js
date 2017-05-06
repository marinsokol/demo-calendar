import { connect } from 'react-redux';
import Header from '../components/Header.component';

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(Header);
