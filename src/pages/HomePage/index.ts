// import { Dispatch, bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { StoreState } from 'store/@types';
// import { thunksMethod } from 'store/user/thunks';

// import HomePage from './HomePage';

// const mapStateToProps = ({ user }: StoreState) => ({ user });

// const mapDispatchToProps = (dispatch: Dispatch) =>
// 	bindActionCreators({ thunksMethod }, dispatch);

// export type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import HomePage from './HomePage';

export default HomePage;
