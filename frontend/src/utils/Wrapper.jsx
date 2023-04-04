export function Wrapper(Component) {
  return (props) => <Component {...props} />;
}
