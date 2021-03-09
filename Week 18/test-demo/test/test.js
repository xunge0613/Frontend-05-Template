var assert = require('assert');
// 引入待测试代码
import { add } from "../add.js" 

describe("add test", function() {
  it('1 + 2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });
}) 