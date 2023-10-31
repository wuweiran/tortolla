import React from "react";
import { BackTop, Space, Pagination, Spin, Divider } from "antd";
import { NormalPost } from "../../Post";

const Latest = () => {
  state = {
    posts: [],
    current: 1,
    pageSize: 10,
    total: 0,
    disabled: false,
  };

  componentDidMount = () => {
    this.update(this.state.current, this.state.pageSize);
  };

  update = (current, pageSize) => {
    this.setState({
      posts: [],
      disabled: true,
    });
    let t = this;
    fetch("/posts/list_top?pageNum=" + current + "&pageSize=" + pageSize, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => res.resultBody)
      .then((pageInfo) => {
        t.setState({
          posts: pageInfo.list,
          total: pageInfo.total,
          current: pageInfo.pageNum,
          pageSize: pageInfo.pageSize,
          disabled: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onChange = (page, pageSize) => {
    this.update(page, pageSize);
  };

  onShowSizeChange = (current, size) => {
    this.update(1, size);
  };

  render() {
    return (
      <div>
        <BackTop />
        <Spin spinning={this.state.disabled} size="large">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {posts.map((postId, i) => (
          <NormalPost key={i} postId={postId}></NormalPost>
        ))}
        <Divider />
      </Space>
        </Spin>
        <Pagination
          current={this.state.current}
          disabled={this.state.disabled}
          pageSize={this.state.pageSize}
          showQuickJumper={true}
          showSizeChanger={true}
          total={this.state.total}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }
}

export default Latest;