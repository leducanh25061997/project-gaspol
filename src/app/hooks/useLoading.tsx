export const useLoading = (
  props: any & { setLoading: (loading: boolean) => void },
) => {
  const showLoading = () => {
    if (props.setLoading) {
      props.setLoading(true);
    }
  };

  const hideLoading = () => {
    if (props.setLoading) {
      props.setLoading(false);
    }
  };

  return { showLoading, hideLoading };
};
