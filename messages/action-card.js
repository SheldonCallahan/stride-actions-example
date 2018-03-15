//Data structure for creat8hg a dynamic action on an application card to open dialog modal
//https://developer.atlassian.com/cloud/stride/apis/document/nodes/applicationCard/
let actionCard = {
  version: 1,
  type: "doc",
  content: [
    {
      type: "applicationCard",
      attrs: {
        text: "some text",
        link: {
          url: "https://atlassian.com"
        },
        actions: [
          {
            title: "view dialog",
            target: {
              key: "app-dialog"
            }
          }
        ],
        collapsible: true,
        title: {
          text: "Sheldon Callahan updated a file: applicationCard.md",
          user: {
            icon: {
              url:
                "https://www.gravatar.com/avatar/3e13178365925ae37993bf7b7418b099",
              label: "Sheldon Callahan"
            }
          }
        },
        description: {
          text:
            "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue\nrutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris\nlobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis\nmagna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,\net vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula\nconsectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit\na, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,\nquam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.\n"
        },
        context: {
          text: "Stride Documentation / ... / Nodes",
          icon: {
            url: "https://image.ibb.co/fPPAB5/Stride_White_On_Blue.png",
            label: "stride"
          }
        }
      }
    }
  ]
};

module.exports = {
  actionCard
};
