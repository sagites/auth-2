/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    let runningSum = new Array(nums.length);
    runningSum[0] = nums[0];
    for(let i=1; i < nums.length; i++){
        runningSum[1] = runningSum[i-1] + nums[i]
    }
    return runningSum;
};