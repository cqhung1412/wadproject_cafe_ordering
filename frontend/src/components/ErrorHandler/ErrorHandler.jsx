import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd'

export const ErrorHandler = (props) => {
  const error = useSelector(state => state.error.error);

  const dispatch = useDispatch();
  const onHandle = () => {
    dispatch({ type: 'HIDE_ERROR' });
  }

  error && console.log(error);
  return (
    <Fragment>
      <Modal
        title={'An Error Occurred D:'}
        onOk={onHandle}
        onCancel={onHandle}
        visible={error ? true : false}
      >
        <p>Message: {error && error.message}</p>
        <p>{error && error.data && 'Data:' + error.data.map(err => JSON.stringify(err))}</p>
      </Modal>
    </Fragment>
  )
}
