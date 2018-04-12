//Data structure for sending a dynamic action as a message to open dialog modal
// We're defining a link that has an action that is targeting a dialog that was defined in the app descriptor.
//https://developer.atlassian.com/cloud/stride/apis/document/marks/action/
let actionMessage = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Open Dialog',
          marks: [
            {
              type: 'action',
              attrs: {
                title: 'view dialog',
                target: {
                  key: 'app-dialog'
                },
                parameters: {
                  reportId: '123'
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

module.exports = {
  actionMessage
}
