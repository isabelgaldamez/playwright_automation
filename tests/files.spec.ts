import { test, expect} from '@playwright/test';
import { join } from 'node:path';
import { describe } from 'node:test';

test.skip('File - Upload files', async ({page}) => {
    await page.goto('Files.html')

    const filename1 = 'file1.txt'
    const filename2 = 'file2.txt'

    const fileInput = await page.locator('#fileInput')

    // file upload using setInputFiles, the file is created in memory and uploaded to the input element, the file is not saved in the file system.
    await fileInput.setInputFiles([
        {   name: filename1, 
            mimeType: 'text/plain', 
            buffer: Buffer.from('This is the content of file 1') 
        },
        {
            name: filename2, 
            mimeType: 'text/plain', 
            buffer: Buffer.from('This is the content of file 2') 
        }
    ])
    // Verify the file was selected
    await expect(page.locator('#fileListContainer')).toHaveText(`${filename1}`);
    await expect(page.locator('#fileListContainer')).toHaveText(`${filename2}`);

});

test.skip('File - Download files', async ({page}) => {
    await page.goto('Files.html')

    const downloadPromise = page.waitForEvent('download'); // Listen for the download event, this will be triggered when the download button is clicked.
    await page.getByText('Download document').click(); // Click on the download button, this will trigger the download event.

    const path = join(__dirname, '..', '..', 'test-results', 'downloaded-file'); // Define the path where the downloaded file will be saved, in this case, it will be saved in the "test-results" folder of the project.

    const download = await downloadPromise; // Wait for the download event to be triggered, this will return a Download object that contains information about the downloaded file.
    await download.saveAs(path);
    // await download.saveAs(download.suggestedFilename()); // Save the downloaded file to the file system, the file will be saved in the default download folder of the browser.
});
