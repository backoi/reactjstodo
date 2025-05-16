import React from "react";

// Higher Order Component for scroll load more functionality
const withScrollLoadMore = (
  WrappedComponent,
  pageSize = 4,
  loadDelay = 1000
) => {
  return class WithScrollLoadMore extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 1,
        loading: false,
        hasMore: true,
      };
      this.containerRef = React.createRef();
    }

    loadMore = () => {
      const { loading, hasMore } = this.state;
      const { getData, onLoadMore } = this.props;
      if (loading || !hasMore) return;

      this.setState({ loading: true }, () => {
        const { page } = this.state;
        const newData = getData(page);
        console.log("newData", newData);

        if (newData.length === 0) {
          this.setState({
            loading: false,
            hasMore: false,
          });
          return;
        }

        setTimeout(() => {
          onLoadMore(newData);
          this.setState({
            loading: false,
          });
        }, loadDelay);
      });
    };

    componentDidMount() {
      if (this.containerRef.current) {
        this.containerRef.current.addEventListener("scroll", this.handleScroll);
      }
      this.loadMore();
    }

    // componentDidUpdate(prevProps) {
    //   // Check if the wrapped component needs to reset and reload
    //   // This implementation is generic, component-specific logic
    //   // should be handled in the wrapped component
    //   if (this.props.shouldReload && this.props.shouldReload(prevProps)) {
    //     this.setState(
    //       {
    //         page: 1,
    //         hasMore: true,
    //         loading: false,
    //       }
    //       // () => {
    //       //   this.loadMore();
    //       // }
    //     );
    //   }
    // }

    componentWillUnmount() {
      if (this.containerRef.current) {
        this.containerRef.current.removeEventListener(
          "scroll",
          this.handleScroll
        );
      }
    }

    handleScroll = (e) => {
      const container = e.target;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const { loading, hasMore } = this.state;

      if (
        scrollTop + clientHeight >= scrollHeight - 20 &&
        !loading &&
        hasMore
      ) {
        this.setState(
          (prevState) => ({
            page: prevState.page + 1,
          }),
          () => {
            this.loadMore();
          }
        );
      }
    };

    render() {
      // Pass the state and ref to the wrapped component
      const { loading, hasMore } = this.state;
      const { displayTodos } = this.props;
      console.log("this.props.displayTodos", displayTodos);

      return (
        <div
          ref={this.containerRef}
          className="h-[200px] overflow-y-auto border border-gray-200 rounded-md shadow-sm"
          style={{ scrollBehavior: "smooth" }}
        >
          <WrappedComponent {...this.props} />

          {(loading || (!hasMore && displayTodos.length > 0)) && (
            <div className="flex justify-center py-2 border-t border-gray-200">
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-2 mr-2"></div>
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">
                  No more items to load
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };
};

export default withScrollLoadMore;
