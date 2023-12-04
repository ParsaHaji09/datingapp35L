import Alert from 'react-bootstrap/Alert';

function ErrorRedirect({ ErrorMessage }) {
  return (
    <>
        <Alert  variant={'danger'} style = {{borderRadius: 10, border: "3px solid rgba(255, 0, 0, 0.3)" }}>
          { ErrorMessage } {' '}
          <Alert.Link href="/register">Click here </Alert.Link> to register a new account.
        </Alert>
    </>
  );
}

export function ErrorField({ ErrorMessage }) {
    return (
        <>
            <Alert variant={'danger'} style = {{borderRadius: 10, border: "3px solid rgba(255, 0, 0, 0.3)" }}>
             {ErrorMessage}
            </Alert>
        </>
    )
}

export default ErrorRedirect;