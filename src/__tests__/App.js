import debounce from "lodash/debounce";

const sinon = require("sinon");

describe("forcing execution", function () {

    // use sinon to control the clock
    let clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers()
    });

    afterEach(function () {
        clock.restore()
    });

    it("should not execute prior to timeout", function () {

        let callback = sinon.spy();

        // set up debounced function with wait of 200
        let fn = debounce(callback, 200);

        // call debounced function at interval of 100
        setTimeout(fn, 100);
        setTimeout(fn, 150);

        // set the clock to 25 (period of the wait) ticks after the last debounced call
        clock.tick(175);

        // the callback should not have been called yet
        expect(callback.callCount).toEqual(0)

    });

    it("should not execute again after timeout when flushed before the timeout", function () {

        let callback = sinon.spy();

        // set up debounced function with wait of 200
        let fn = debounce(callback, 200);

        // call debounced function at interval of 50
        setTimeout(fn, 50);
        setTimeout(fn, 150);

        // set the clock to 25 (period of the wait) ticks after the last debounced call
        clock.tick(175);

        fn.flush();

        // the callback has been called here
        expect(callback.callCount).toEqual(1);

        // move to past the timeout
        clock.tick(225);

        // the callback should have only been called once
        expect(callback.callCount).toEqual(1)

    });

    it("should not execute on a timer after being flushed", function () {

        let callback = sinon.spy();

        // set up debounced function with wait of 100
        let fn = debounce(callback, 100);

        // call debounced function at interval of 100
        setTimeout(fn, 100);
        setTimeout(fn, 150);

        // set the clock to 25 (period of the wait) ticks after the last debounced call
        clock.tick(175);

        fn.flush();

        // the callback has been called here
        expect(callback.callCount).toEqual(1);

        // schedule again
        setTimeout(fn, 250);

        // move to past the new timeout
        clock.tick(400);

        // the callback should have been called again
        expect(callback.callCount).toEqual(2)

    });
});
