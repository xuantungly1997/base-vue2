"use strict";

function PromiseQueue(options) {
  options = Object.assign(
    {
      concurrency: 1,
      Promise: Promise,
    },
    options
  );

  if (typeof options.Promise !== "function") {
    throw new Error("no promise implementation");
  }

  let queue = [];

  let running = 0;
  let startFlag = false;

  function completed() {
    running -= 1;
    processQueue();
  }

  function processQueue() {
    // eslint-disable-next-line
    while (startFlag && running < options.concurrency && queue.length) {
      let state = queue.shift();

      running += 1;

      let fn = state.f;
      let fnPromise = new options.Promise((r) => r(fn()));

      state.r(fnPromise);

      fnPromise.then(completed, completed);
    }
  }

  function enqueue(f) {
    return new options.Promise((r) => {
      queue.push({ f, r });

      processQueue();
    });
  }

  function renew() {
    queue = [];
    running = 0;
  }

  return {
    enqueue: enqueue,
    add: enqueue,
    renew: renew,
    start: () => {
      startFlag = true;
      processQueue();
    },
    stop: () => {
      startFlag = false;
    },
  };
}

export default PromiseQueue;
