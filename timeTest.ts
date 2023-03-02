const time = new Date()

let error: boolean;
let timestamp: number = 2; // placeholder number

if (error = true) {
    let startTime = time.getTime();
    let errTime = timestamp;
    let endTime: number = startTime + 5000;
    var errorCount = 0;

    if (errTime - startTime < 5000) {
        var valid = startTime <= errTime && endTime >= errTime;
        if (valid = true) {
            errorCount++;
            if (errorCount >= 3) {
                // write to log
            }
        }
    }

    // setTimeout(() => {
    if (valid = true) {
        errorCount++;
        if (errorCount >= 3) {
            // write to log
        }
    }
    // }, 5000)
}