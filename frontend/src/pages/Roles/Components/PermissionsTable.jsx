import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

function PermissionsTable({
  permissions,
  setPermissions,
  defaultPermissions = [],
}) {
  return (
    <Table striped size="sm">
      <thead>
        <tr>
          <th colSpan="2">Roles &amp; Permissions</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(permissions).map((module) => (
          <tr key={`module-${module}`}>
            <th scope="row">{module}</th>
            <td>
              {permissions[module].map((permission) => (
                <Form.Group
                  key={`permission-${permission.id}`}
                  controlId={`permission-${permission.id}`}
                >
                  <Form.Check
                    type="checkbox"
                    name="permissions[]"
                    onChange={setPermissions}
                    label={permission.name}
                    defaultChecked={defaultPermissions.includes(permission.id)}
                    value={permission.id}
                  />
                </Form.Group>
              ))}
            </td>
          </tr>
        ))}
        <tr />
      </tbody>
    </Table>
  );
}

PermissionsTable.propTypes = {
  permissions: PropTypes.object.isRequired,
  setPermissions: PropTypes.func.isRequired,
  defaultPermissions: PropTypes.array,
};

PermissionsTable.defaultProps = {
  defaultPermissions: [],
};

export default PermissionsTable;
